import { useContext, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRegister } from '@/types/Auth';
import authService from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ToasterContext } from '@/contexts/ToasterContext';

const registerSchema = yup.object().shape({
	fullName: yup.string().required('Mohon masukkan nama pengguna'),
	email: yup
		.string()
		.email('Email tidak valid')
		.required('Mohon masukkan email'),
	password: yup
		.string()
		.min(8, 'Kata sandi minimal 8 karakter')
		.required('Mohon masukkan kata sandi')
		.test(
			'at-least-one-uppercase-letter',
			'Contains at least one capital letter',
			(value) => {
				if (!value) {
					return false;
				}

				const regex = /^(?=.*[A-Z])/;
				return regex.test(value);
			}
		)
		.test('at-least-one-number', 'Give at least one number', (value) => {
			if (!value) {
				return false;
			}

			const regex = /^(?=.*\d)/;
			return regex.test(value);
		}),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), ''], 'Password not match')
		.required('Please fill confirmation password'),
});

const useRegister = () => {
	const router = useRouter();
	const [visiblePassword, setVisiblePassword] = useState({
		password: false,
		confirmPassword: false,
	});
	const { setToaster } = useContext(ToasterContext);

	const handleVisiblePassword = (key: 'password' | 'confirmPassword') => {
		setVisiblePassword({
			...visiblePassword,
			[key]: !visiblePassword[key],
		});
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm({
		resolver: yupResolver(registerSchema),
	});

	const registerService = async (payload: IRegister) => {
		const result = await authService.register(payload);
		return result;
	};

	const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
		mutationFn: registerService,

		onError: (error) => {
			setToaster({
				type: 'error',
				message: error.message,
			});
		},
		onSuccess: () => {
			reset();
			setToaster({
				type: 'success',
				message: 'Register Success!',
			});
			router.push('/auth/register/success');
		},
	});

	const handleRegister = (data: IRegister) => mutateRegister(data);

	return {
		visiblePassword,
		handleVisiblePassword,
		control,
		handleSubmit,
		handleRegister,
		isPendingRegister,
		errors,
	};
};

export default useRegister;
