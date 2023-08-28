<script lang="ts" setup name="Navigatorhhhhh-echartsview" >
// import LoginView from './components/LoginView.vue'
import PersonalLogin from './components/PersonalLogin.vue'
// import RegisterView from './components/RegisterView.vue';

</script>

<template>
    <div class=" flex justify-center items-center text-[#0a71b4] ">
        <div class=" flex w-3/4 ">
            <div>
                <img class=" w-[21vw] " src="../../../../assets/bg.png" alt="这是一张图片">
            </div>
            <div class=" relative flex-1 flex flex-col justify-between px-40 pb-32 pt-11 bg-white ">
                <img src="../../../../assets/icon.png" alt="一张图片" class=" absolute right-0 top-0 ">
               <!-- <LoginView /> -->
               <PersonalLogin />
               <!-- <RegisterView /> -->
                <div class=" absolute bottom-[-30px] left-0 right-0 p-14 flex justify-between items-center text-xs">
                    <div>
                        <p class=" mb-1 "> Copyright PolicyPrivacy Policysend Feedback</p>
                        <p>User AgreementCookie PolicyCommunity Guidelines</p>
                    </div>
                    <div>
                        Linkedin @ 2020
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>