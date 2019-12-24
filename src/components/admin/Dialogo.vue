<template>
    <div id="job">
        <button class="btn" @click="test1">Diálogo 1</button>
        <button class="btn" @click="test2">Diálogo 2</button>
    </div>
</template>

<script>
export default {
    name: 'dialogo',
    methods: {
        test1() {
           this.$swal("Good job!", "You are ready to start!", "success")
        },
        test2() {
            this.$swal("Good job!", "You are ready to start!", 
                { buttons: {
                    confirm: { value: 0 },
                    cancelar: { value: 1 }
                    }
                }).then((res) => {
                    alert(res)
                })
        },
    }
}

</script>

<style>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

.rating {
  padding: 30px 0 0 0;
}

.vue-star-rating {
    margin: 20px auto;
}

.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  background-color: #42b983;
  cursor: pointer;
  color: #fff;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857;
  border-radius: 4px;
}

</style>