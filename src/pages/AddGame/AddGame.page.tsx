import { Gamepad2, X, CheckCircle2 } from 'lucide-react'

import { useSubmitGameMutation, useGetCategoriesForDropdownQuery } from '../../services/redux/apis/games'
import Loader from '../../loader/Loader'
import { useAddGameForm, type AddGameValues } from './addGame.schema';
import Modal from '../../components/modal/Modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '../../utils/errors.utils';
import AppWrapper from '../../HOC/AppWrapper';
import Dropdown from '../../components/dropdown/Dropdown';
import Checkbox from '../../components/checkbox/Checkbox';
import FileInput from '../../components/fileInput/FileInput';
import { GIF_MEME_TYPE, IMAGE_MEME_TYPE, GAME_ENGINES } from '../../constants/game.constants';
import { Controller } from 'react-hook-form';
import TextInput from '../../components/TextInput/TextInput';

const AddGame = () => {
    const navigate = useNavigate();

    const [submitGame, { isLoading, isError, error: apiError, isSuccess }] = useSubmitGameMutation();
    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesForDropdownQuery();

    const [modalOpen, setModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>("")

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useAddGameForm();

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiErrorMessage(apiError);
            setErrorMessage(errorMessage);
            setModalOpen(true)
        }
        if (isSuccess) {
            setErrorMessage(null);
            setModalOpen(true);
        }
    }, [isError, isSuccess, apiError])

    const onSubmit = async (data: AddGameValues) => {
        const selectedCategory = categories?.find(c => c.title === data.category);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('gameEngine', data.gameEngine);
        formData.append('categoryId', String(selectedCategory?.id || ""));
        formData.append('mobileSupport', String(data.mobileSupport));
        formData.append('multiplayer', String(data.multiplayer));
        formData.append('gameFile', data.gameFile);
        formData.append('gif', data.gif);
        formData.append('thumbnail', data.thumbnail);

        try {
            await submitGame(formData).unwrap();
        } catch (err) {
            console.error("Failed to submit game:", err);
        }
    }

    const onModalClose = () => {
        setModalOpen(false)
        isValid && !isError && navigate('/')
    }

    if (isLoading || isLoadingCategories) {
        return <Loader />
    }

    return (
        <AppWrapper>
            <div className="flex flex-col items-center">
                <Modal isOpen={modalOpen} onClose={onModalClose} Icon={isError ? <div className="p-4 mb-5 bg-gray rounded-full">
                    <X className='text-custom-red' strokeWidth={4} />
                </div> : isSuccess ? <div className="p-4 mb-5 bg-gray rounded-full">
                    <CheckCircle2 className='text-secondary' strokeWidth={4} />
                </div> : null}>
                    <div className="mb-5">
                        <h2 className='text-lg'>{errorMessage || "Game Created Successfully!"}</h2>
                    </div>
                </Modal>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-card border border-secondary rounded-2xl mb-6 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                        <Gamepad2 className="w-8 h-8 text-secondary" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">Add Game</h1>
                    <p className="text-muted-foreground">Add your game to the platform</p>
                </div>

                {/* Card */}
                <div className="border w-full lg:w-1/2 lg:min-w-96 md:w-2/3 border-border p-8 rounded-2xl shadow-sm shadow-gray">
                    <div className="space-y-4">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <TextInput
                                register={register}
                                name={'name'}
                                placeholder='Name of the Game'
                                error={errors.name}
                            />
                            <TextInput
                                register={register}
                                name={'description'}
                                placeholder='Game Description'
                                error={errors.description}
                            />

                            <div className="space-y-2">
                                <Controller
                                    control={control}
                                    name='gameEngine'
                                    render={({ field: { onChange, value } }) => {
                                        return <Dropdown label={value || 'Game Engine'} options={GAME_ENGINES} onChange={onChange} />
                                    }}
                                />
                                {errors.gameEngine && <p className='text-custom-red text-xs'>{errors.gameEngine.message}</p>}

                            </div>

                            <div className="space-y-2">
                                <Controller
                                    control={control}
                                    name='category'
                                    render={({ field: { onChange, value } }) => {
                                        return <Dropdown
                                            label={value || 'Category'}
                                            options={categories?.map(c => c.title) || []}
                                            onChange={onChange}
                                        />
                                    }}
                                />
                                {errors.category && <p className='text-custom-red text-xs'>{errors.category.message}</p>}

                            </div>

                            <div className="space-y-2">
                                <Controller
                                    control={control}
                                    name='multiplayer'
                                    render={({ field: { onChange, value } }) => {
                                        return <Checkbox label='is Multiplayer ?' value={value} onChange={onChange} />
                                    }}
                                />
                                {errors.multiplayer && <p className='text-custom-red text-xs'>{errors.multiplayer.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Controller
                                    control={control}
                                    name='mobileSupport'
                                    render={({ field: { onChange, value } }) => {
                                        return <Checkbox label='Supports Mobile ?' value={value} onChange={onChange} />
                                    }}
                                />
                                {errors.mobileSupport && <p className='text-custom-red text-xs'>{errors.mobileSupport.message}</p>}

                            </div>

                            <div className="space-y-2">
                                <TextInput
                                    register={register}
                                    name='gameFile'
                                    placeholder='Game Iframe URL (e.g., https://example.com/game.html)'
                                    error={errors.gameFile}
                                />
                            </div>

                            <div className="space-y-2">
                                <Controller
                                    control={control}
                                    name='gif'
                                    render={({ field: { onChange } }) => {
                                        return <FileInput label={'ADD GIF'} accept={GIF_MEME_TYPE} onChange={onChange} />
                                    }}
                                />
                                {typeof errors.gif?.message === "string" && (
                                    <p className="text-custom-red text-xs">
                                        {errors.gif.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Controller
                                    control={control}
                                    name='thumbnail'
                                    render={({ field: { onChange } }) => {
                                        return <FileInput label={'ADD THUMBNAIL'} accept={IMAGE_MEME_TYPE} onChange={onChange} />
                                    }}
                                />
                                {typeof errors.thumbnail?.message === "string" && (
                                    <p className="text-custom-red text-xs">
                                        {errors.thumbnail.message}
                                    </p>
                                )}
                            </div>

                            <button className="w-full h-12 bg-secondary hover:bg-secondary/50 text-black font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.3)]" type='submit'>
                                Create Game
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppWrapper>
    )
}

export default AddGame
