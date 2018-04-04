node {
  def GCP_PROJECT = 'andoromeda-198508'
  def GCP_CLUSTER = 'cluster-1'
  def GCP_ZONE = 'asia-east1-c'
  def GCP_SERVICE_ACCOUNT_CREDENTIALID = 'GCP Service Account Andoromeda'
  def APP_NAME = 'crypto-sanguo-web'
  def IMAGE_TAG = "gcr.io/${GCP_PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  def NAMESPACE;

  stage('Init parameters') {
    if (env.BRANCH_NAME == 'master') {
      NAMESPACE = 'default' // It's production
    } else if (env.BRANCH_NAME == 'testing') {
      NAMESPACE = 'testing'
    } else {
      echo "Only works on master/testing branches"
      sh 'exit 1'
    }
  }

  stage('Clone repository') {
    checkout scm
  }

  stage('NPM run build') {
    docker.image('node:carbon').inside {
        sh 'npm install'
        sh 'npm run build'
    }
  }

  stage('Build image') {
    docker.build("${IMAGE_TAG}")
  }

  stage('Sign in GCP') {
    withCredentials([file(credentialsId: "${GCP_SERVICE_ACCOUNT_CREDENTIALID}", variable: 'KEY_FILE')]) {
        docker.image('google/cloud-sdk:latest').inside {
            sh "gcloud auth activate-service-account --key-file=$KEY_FILE"
            sh "gcloud container clusters get-credentials ${GCP_CLUSTER} --zone ${GCP_ZONE} --project ${GCP_PROJECT}"

            stage('Push image') {
              sh "gcloud docker -- push ${IMAGE_TAG}"
            }

            stage('Deploy') {
              sh "sed -i.bak 's#APP_NAME#${APP_NAME}#' ./k8s/deployment.yaml"
              sh "sed -i.bak 's#IMAGE_TAG#${IMAGE_TAG}#' ./k8s/deployment.yaml"
              sh "sed -i.bak 's#NAMESPACE#${NAMESPACE}#' ./k8s/deployment.yaml"

              sh 'cat ./k8s/deployment.yaml';

              // Create namespace if it doesn't exist
              sh "kubectl get ns ${NAMESPACE} || kubectl create ns ${NAMESPACE}"
              sh "kubectl apply -f ./k8s/deployment.yaml"
            }
        }
    }
  }
}
