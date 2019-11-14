<template>
  <div>
    <b-table :fields="fields" :items="items" foot-clone>

      <!-- <template v-slot:cell(name)="data">
        {{ data.value.first }} {{ data.value.last }}
      </template>

      <template v-slot:head(name)="data">
        <span class="text-info">{{ data.label.toUpperCase() }}</span>
      </template>

      <template v-slot:foot(name)="data">
        <span class="text-danger">{{ data.label }}</span>
      </template>

      <template v-slot:foot()="data">
        <i>{{ data.label }}</i>
      </template> -->
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          // A column that needs custom formatting
          { key: 'name', label: 'Full Name' },
          // A regular column
          'age',
          // A regular column
          'sex'
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
          { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
          { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
        ]
      }
    }
  }
</script>