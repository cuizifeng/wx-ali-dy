<view>
	<!-- 
	width: 图片框宽度
	height: 图片框高度
	list: 绑定临时图片列表数组
	count: 允许上传图片数量
	uploadUrl: 上传服务端url
	done:  上传成功后回调事件 -->
	<xc-upload :list="uploadImgs" :count="9" :uploadUrl="uploadUrl" done="setImg"></xc-upload>
</view>

<script>
	export default {

		data() {
			return {
				//服务端上传URL
				uploadUrl: service.BASE_URL + '/app/upload/upload',
				//上传数组，编辑时加载专用
				uploadImgs: [],
			}
		},
		methods: {
			//上传完成后操作
			setImg(data) {
				console.log(data);
			}
		}
	}
</script>
