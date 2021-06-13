<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row  mt-4">
      <div class="col-4 mb-4" v-for="item in products"
          :key="item.id">
        <div
          class="card border-0 shadow-sm"
          
        >
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;"
            :style = "{backgroundImage: `url(${item.imageUrl})`}"
            
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price | currency }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price |currency }} 元</del> <!-- 文字刪除線 -->
              <div class="h5" v-if="item.price">現在只要 {{ item.price | currency }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id "></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id "></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" id="productModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;"
            :style = "{backgroundImage: `url(${product.imageUrl})`}"
            
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ product.category }}</span>
            <p class="card-text">{{ product.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">{{ product.origin_price | currency }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price |currency }} 元</del> <!-- 文字刪除線 -->
              <div class="h5" v-if="product.price">現在只要 {{ product.price | currency }} 元</div>
            </div>
            <div>
              <label for="inputState">購買數量</label>
              <select id="inputState" class="form-control">
                <option selected>Choose...</option>
                <option v-for="i in 10" :key="i">{{i}} {{product.unit}}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <div class="p">小計{{ product.price | currency }} 元</div>
            <button type="button" class="btn btn-primary">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal END -->
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "customerOrder",
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: ''
      },
      products: [],
      product: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts: function () {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          vm.products = response.data.products;
          vm.isLoading = false;
        }
      });
    },
    getProduct: function (id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      vm.product= {}
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          vm.product = response.data.product;
          console.log(vm.product)
          
          vm.status.loadingItem = '';
          $("#productModal").modal("show");
        }
      });
    },
  },
};
</script>

