<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ disabled: !pagination.has_pre }"
          @click="getProductsData(pagination.current_page - 1)"
        >
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{ active: pagination.current_page === page }"
          @click="getProductsData(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: !pagination.has_next }"
          @click="getProductsData(pagination.current_page + 1)"
        >
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
	props: ['pagination'],
	data(){
		return {
    }
	},
  methods: {
    getProductsData(page){
      //console.log('在子元件時',page)
      this.$emit("btn",page)
    }
  }
}
</script>