<template>
    <div>
        <h1>{{ msg }}</h1>
        <ul>
            <li v-for="item in items" v-bind:key="item.id">
                {{ item.name }} Harga Rp. {{ item.price }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Item',
        data () {
            return {
                msg: 'List Item',
                items: [
                    {   id: 1,
                        name: 'Kopi',
                        price : 3000,
                    },
                    {
                        id: 2,
                        name: 'Teh',
                        price : 2000,
                    },
                    {
                        id: 3,
                        name: 'Susu',
                        price : 5000,
                    },

                ]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
