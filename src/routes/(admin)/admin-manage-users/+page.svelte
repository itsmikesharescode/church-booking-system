<script lang="ts">
  import { fromStaticRouteState } from '../../_states/fromStaticRouteState.svelte';
  import Table from './components/table/components/table.svelte';
  import { columns } from './components/table/components/columns';
  import { initTableState } from './components/table/tableState.svelte';
  import RenderUsers from './_components/RenderUsers.svelte';
  import { fromManageUsersRoute } from '../_states/fromManageUsers.svelte';
  import DeleteUser from './components/delete-user/delete-user.svelte';
  import UpdateUser from './components/update-user/update-user.svelte';
  const { data } = $props();

  const staticRoute = fromStaticRouteState();

  staticRoute.setRoute('/admin-manage-users');
  const manageUsersRoute = fromManageUsersRoute();
  initTableState();
</script>

<div class="flex flex-col gap-[2rem] p-[1rem] sm:p-[2rem]">
  <section class="flex flex-col gap-[0.625rem]">
    <!-- <div class="flex flex-col items-center gap-[1rem] md:flex-row md:justify-between">
      <CreateUser createUserForm={data.createUserForm} />
    </div> -->

    <Table
      {columns}
      data={manageUsersRoute.getUsers()?.map((item) => ({
        user_id: item.user_id,
        created_at: item.created_at,
        email: item.user_meta_data.email,
        first_name: item.user_meta_data.firstName,
        middle_name: item.user_meta_data.middleName,
        last_name: item.user_meta_data.lastName,
        mobile_number: item.user_meta_data.mobileNum,
        gender: item.user_meta_data.gender
      })) ?? []}
    />
  </section>
</div>

<DeleteUser />
<UpdateUser updateUserForm={data.updateUserForm} />
