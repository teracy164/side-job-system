<template>
  <div>
    <button>追加</button>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>氏名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of users">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { User } from "~~/lib/api-client";

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  setup() {
    const data = reactive<{
      users: User[];
    }>({ users: [] });
    return data;
  },
  async mounted() {
    const result = await this.$api.getUsers();
    this.users = result.data;
  }
});
</script>
<style lang="scss" scoped>
</style>