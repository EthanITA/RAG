<template>
  <div class="size-full flex flex-col">
    <NuxtPage />
    <div class="flex gap-2 mx-auto">
      <NuxtLink
        v-for="route in $router.options.routes ?? []"
        :to="route.path"
        class="link link-primary"
      >
        {{ route.name }}
      </NuxtLink>
    </div>
  </div>
</template>
