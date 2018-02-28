<template>
	<tr v-for="(item, index) of slist">
    <td>{{index+1}}</td>
    <td>{{item.name}}</td>
    <td>{{item.owner}}</td>
    <td>{{item.price}}</td>
    <td>{{item.time}}</td>
    <!-- <td><a href="javascript:;" @click="showOverlay(index)">修改</a> | <a href="javascript:;" @click="del(index)">删除</a></td> -->
	</tr>

</template>

// name owner price time