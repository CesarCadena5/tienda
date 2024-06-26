<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
            <li class="page-item" v-if="store.prevPage">
                <button class="page-link" aria-label="Previous" @click="showMoreItems(store.prevPage)">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            <li 
                class="page-item" 
                v-if="store.nextPage">
                <button class="page-link" aria-label="Next" @click="showMoreItems(store.nextPage)">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        </ul>
        <h6 class="text-end">Página {{ store.prevPage + 1 }} de {{ store.totalPages }}</h6>
    </nav>
</template>

<script setup>

const props = defineProps({
    store: {
        type: Object,
        required: true
    },
    methodListStore: {
        type: Function,
        required: true
    }
});

const showMoreItems = (page) => {
    props.methodListStore(page);
}
</script>