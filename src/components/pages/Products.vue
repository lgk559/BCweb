<template>
  <div>
    <loading :active="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table table-striped table-sm mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="100">原價</th>
          <th width="100">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price }}</td>
          <td class="text-right">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-secondary">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDeleteData(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="templateData.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if='status.fileUploading'></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  :src="templateData.imageUrl"
                  class="img-fluid"
                  alt=""
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="templateData.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="templateData.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="templateData.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="templateData.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="templateData.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="templateData.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="templateData.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="templateData.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="upModalData">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除 -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ templateData.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteData">確認刪除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal end-->
  </div>
</template>	

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [],
      templateData: {},
      isNew: '',
      isLoading: false,
      status:{
        fileUploading: false,
      }
    };
  },
  created() {
    this.getProductsData();
    // this.$bus.$emit('message:push','這裡是一段訊息','success');//測試是否成功
  },
  methods: {
    getProductsData() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    openModal(isNew,item) {
      console.log(isNew,item)
      if(!isNew){
        this.isNew = false;
        this.templateData = Object.assign({},item); //避免傳址傳值
      }else{
        this.isNew = true;
        this.templateData = {};
      }
      $("#productModal").modal("show");
    },
    upModalData() {
      

      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;

      let httpMethod = 'post'
      const vm = this;
      if(!vm.isNew){
        httpMethod = 'put';
        // console.log(vm.templateData)
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.templateData.id}`;
        console.log(api)

      } 

      console.log(vm.templateData)
      

      this.$http[httpMethod](api, { data: vm.templateData }).then((response) => {
        // console.log(response.data);
        if (response.data.success){
          console.log(vm.templateData)
          $("#productModal").modal("hide");
          vm.getProductsData();
        }
      });
      
    },
    openDeleteData(item){
      $("#delProductModal").modal("show");
      this.templateData = item
    },

    deleteData(){
      let vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.templateData.id}`;
      let httpMethod = 'delete'
      
      this.$http[httpMethod](api, { data: vm.templateData }).then((response) => {
        console.log(response.data);
        if (response.data.success){
          $("#delProductModal").modal("hide");
          vm.getProductsData();
        }else{
          console.log('刪除失敗')
        }
      });
    },
    uploadFile(){
      // console.log(this.products)
      const formData = new FormData();
      const uploadedFile = this.$refs.files.files[0]; //
      // console.log(uploadedFile)
      let vm = this;
      vm.status.fileUploading = true;
      formData.append('file-to-upload',uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response)=>{
        // console.log(response.data);
        if(response.data.success){
          // vm.templateData.image = response.data.imageUrl; //可能沒有雙向綁定方法。註
          vm.status.fileUploading = false;
          vm.$set(vm.templateData,'imageUrl',response.data.imageUrl)
          console.log(vm.templateData)
        }else{
          this.$bus.$emit('message:push',response.data.message,'danger');
        }
      })
      
    }
  },
};
</script>