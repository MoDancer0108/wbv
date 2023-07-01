<template>
	<div class="main" @keydown.enter="isLogin ? login() : reg()">
		<el-card class="login">
			<img class="img" src="/favicon.ico" alt="">
			<FormSlot
				:model="ctx.initForm('form')"
				label-width="80px"
				:rules="formRules"
			>
				<el-form-item prop="user" label="账号">
					<el-input class="input" v-model="ctx.form.user" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input class="input" v-model="ctx.form.password" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item v-if="!isLogin" prop="checkPass" label="确认密码">
					<el-input class="input" v-model="ctx.form.checkPass" placeholder="请再次输入密码" show-password></el-input>
				</el-form-item>
				<div class="btns">
					<template v-if="isLogin">
						<el-button @click="toggle">注册账号</el-button>
						<el-button type="primary" @click="login" :loading="submitBtnLoading">登录</el-button>
					</template>
					<template v-else>
						<el-button @click="toggle">去登录</el-button>
						<el-button type="primary" @click="reg" :loading="submitBtnLoading">注册</el-button>
					</template>
				</div>
			</FormSlot>
		</el-card>
	</div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { FormSlot } from '@/wbv';
import { regApi, loginApi } from '@/api/login';

const ctx = inject('ctx');
const router = useRouter();
const isLogin = ref(true);
const submitBtnLoading = ref(false);
const formRules = reactive({
	user: [
		{ required: true, message: '请输入账号', trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
	],
	checkPass: [
		{ validator: validatePass, trigger: 'blur' },
	],
});

function toggle() {
	isLogin.value = !isLogin.value;
}
function reg() {
	const formRef = ctx.getFormSlotRef('form');
	formRef.validate(async (valid, fields) => {
		if (valid) {
			submitBtnLoading.value = true;
			try {
				const res = await regApi(ctx.form);
				if (res.code == 200) {
					isLogin.value = true;
					ctx.form = {};
					$toast.success({
						message: '注册成功',
					});
				}
			} finally {
				submitBtnLoading.value = false;
			}
		}
	})
}
function login() {
	const formRef = ctx.getFormSlotRef('form');
	formRef.validate(async (valid, fields) => {
		if (valid) {
			submitBtnLoading.value = true;
			try {
				const res = await loginApi(ctx.form);
				if (res.code == 200) {
					$data.setLocalData('userID', res.data);
					$data.setLocalData('tabList', [{ label: '首页', value: $config.defaultRoute, readOnly: true }]);
					$data.setLocalData('currentTab', $config.defaultRoute);
					router.push('/');
				}
			} finally {
				submitBtnLoading.value = false;
			}
		}
	})
}
function validatePass(rule, value, callback) {
	if (value == '') {
		callback(new Error('请再次输入密码'));
	} else if (value !== ctx.form.password) {
		callback(new Error("两次输入密码不一致"));
	} else {
		callback();
	}
}

onMounted(() => {
	ctx.form = {
		user: '123',
		password:  '123',
	};
});
</script>

<style scoped lang="scss">
.main {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	background-color: #28a386;

	.login {
		position: relative;
		width: 400px;
		background-color: #fff;
		overflow: visible;

		:deep(.el-card__body) {
			display: flex;
			justify-content: center;
			height: 100%;
		}

		:deep(.formSlot) {
			width: 300px;
			margin-top: 40px;
		}

		.btns {
			display: flex;
			justify-content: center;
		}

		.img {
			position: absolute;
			width: 80px;
			height: 80px;
			top: -40px;
			left: 0;
			right: 0;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 50%;
			border: solid #fff 3px;
			box-shadow: 0 0 20px 4px #eee;
		}
	}
}
.input {
	width: 90%;
}
</style>