<script lang="ts" setup>
definePageMeta({
  layout: "(admin)-default",
  middleware: ["admin"]
})

import { usePostStore } from '~/stores/client/PostStore';
import { useStatsStore } from '~/stores/admin/StatStore';

import type { Post } from '@prisma/client';
import dataTable from "~/components/admin/posts/data-table.vue";
import { columns } from "~/components/admin/posts/columns"
import StatCards from './(components)/StatCards.vue';
import { File } from 'lucide-vue-next';
import NoPostNotice from './(components)/NoPostNotice.vue';

const user = useSupabaseUser()
const statsStore = useStatsStore()
const postStore = usePostStore()

onBeforeMount(async () => {
  await postStore.getPosts()
})

onBeforeMount(async () => {
  await statsStore.fetchStats()
})
</script>

<template>
  <div class="px-4 lg-px-10 xl:px-12 py-6 lg-py-12 2xl:py-12">
    <div class="flex flex-col ">
      <div class="mb-8 lg:mb-10 xl:mb-12 2xl:mb-16 flex justify-between">
        <span class="text-2xl lg:text-3xl font-bold">Posts</span>
        <NuxtLink to="/dashboard/create-post">
          <Button>New Post</Button>
        </NuxtLink>
      </div>
      <StatCards v-if="statsStore.totalPost !== 0" />
      <NoPostNotice v-else />
      <div>
        <dataTable :columns="columns" :data="postStore.posts || []" v-if="postStore.posts" />
        <div v-else>
          <Skeleton class="w-full h-96 rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>


<style></style>