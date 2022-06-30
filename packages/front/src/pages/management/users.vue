<template>
  <div>
    <button class="primary" @click="addUser">追加</button>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>氏名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of users" @click="editUser(user)">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
        </tr>
      </tbody>
    </table>
    <UserEditOverlay v-if="visibleDialog" v-model:visible="visibleDialog" :user="detail" @update:task="onupdate" />
  </div>
</template>
<script lang="ts">
import { User } from "~~/lib/api-client";
import UserEditOverlay from "~~/components/user/user-edit-overlay.vue";

definePageMeta({ layout: 'authenticated', middleware: ['auth'] });
export default defineComponent({
  setup() {
    const data = reactive<{
      users: User[];
      detail: User | null;
      visibleDialog: boolean;
    }>({ users: [], detail: null, visibleDialog: false });
    return data;
  },
  async mounted() {
    this.users = await this.$api.getUsers();
  },
  methods: {
    addUser() {
      this.detail = null;
      this.visibleDialog = true;
    },
    editUser(user: User) {
      this.detail = user;
      this.visibleDialog = true;
    }
  },
  components: { UserEditOverlay }
});
</script>
<style lang="scss" scoped>
</style>