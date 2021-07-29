<template>
  <div class="flex items-center justify-evenly h-16 bg-primary w-full fixed bottom-0">
    <router-link to="/">
      <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 25V16.1765H15V25H21.25V13.2353H25L12.5 0L0 13.2353H3.75V25H10Z"
        fill="#EFEEFD"
        fill-opacity="0.6"
        />
      </svg>
    </router-link>
    <router-link to="/organizations">
      <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5.55556V0H0V25H24V5.55556H12ZM4.8 22.2222H2.4V19.4444H4.8V22.2222ZM4.8 16.6667H2.4V13.8889H4.8V16.6667ZM4.8 11.1111H2.4V8.33333H4.8V11.1111ZM4.8 5.55556H2.4V2.77778H4.8V5.55556ZM9.6 22.2222H7.2V19.4444H9.6V22.2222ZM9.6 16.6667H7.2V13.8889H9.6V16.6667ZM9.6 11.1111H7.2V8.33333H9.6V11.1111ZM9.6 5.55556H7.2V2.77778H9.6V5.55556ZM21.6 22.2222H12V19.4444H14.4V16.6667H12V13.8889H14.4V11.1111H12V8.33333H21.6V22.2222ZM19.2 11.1111H16.8V13.8889H19.2V11.1111ZM19.2 16.6667H16.8V19.4444H19.2V16.6667Z" fill="white"/>
      </svg>
    </router-link>
    <router-link to="/projects">
      <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 17.5H18V20H6V17.5ZM6 12.5H18V15H6V12.5ZM15 0H3C1.35 0 0 1.125 0 2.5V22.5C0 23.875 1.335 25 2.985 25H21C22.65 25 24 23.875 24 22.5V7.5L15 0ZM21 22.5H3V2.5H13.5V8.75H21V22.5Z" fill="#EFEEFD" fill-opacity="0.6"/>
      </svg>
    </router-link>
    <router-link to="/profile">
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM6.3375 20.35C6.875 19.225 10.15 18.125 12.5 18.125C14.85 18.125 18.1375 19.225 18.6625 20.35C16.9625 21.7 14.825 22.5 12.5 22.5C10.175 22.5 8.0375 21.7 6.3375 20.35ZM20.45 18.5375C18.6625 16.3625 14.325 15.625 12.5 15.625C10.675 15.625 6.3375 16.3625 4.55 18.5375C3.275 16.8625 2.5 14.775 2.5 12.5C2.5 6.9875 6.9875 2.5 12.5 2.5C18.0125 2.5 22.5 6.9875 22.5 12.5C22.5 14.775 21.725 16.8625 20.45 18.5375ZM12.5 5C10.075 5 8.125 6.95 8.125 9.375C8.125 11.8 10.075 13.75 12.5 13.75C14.925 13.75 16.875 11.8 16.875 9.375C16.875 6.95 14.925 5 12.5 5ZM12.5 11.25C11.4625 11.25 10.625 10.4125 10.625 9.375C10.625 8.3375 11.4625 7.5 12.5 7.5C13.5375 7.5 14.375 8.3375 14.375 9.375C14.375 10.4125 13.5375 11.25 12.5 11.25Z" fill="#EFEEFD" fill-opacity="0.6"/>
      </svg>
    </router-link>
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="cursor-pointer" @click="logout"
    >
      <path d="M17 8L15.59 9.41L17.17 11H9V13H17.17L15.59 14.58L17 16L21 12L17 8ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z" fill="#EFEEFD" fill-opacity="0.6"/>
    </svg>

  </div>
</template>

<script>
export default {
  props: {
    logout: Function
  }
}
</script>