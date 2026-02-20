import { Gamepad2, X, CheckCircle2, Plus, Calendar, Clock, Monitor, Smartphone, AlertCircle } from 'lucide-react'

import { useSubmitGameMutation, useGetCategoriesForDropdownQuery, useGetMyGamesQuery } from '../../services/redux/apis/games'
import Loader from '../../loader/Loader'
import { useAddGameForm, type AddGameValues } from './addGame.schema';
import Modal from '../../components/modal/Modal';
import { useEffect, useState } from 'react';
import { getApiErrorMessage } from '../../utils/errors.utils';
import AppWrapper from '../../HOC/AppWrapper';
import Dropdown from '../../components/dropdown/Dropdown';
import Checkbox from '../../components/checkbox/Checkbox';
import FileInput from '../../components/fileInput/FileInput';
import { GIF_MEME_TYPE, IMAGE_MEME_TYPE, GAME_ENGINES } from '../../constants/game.constants';
import { Controller } from 'react-hook-form';
import TextInput from '../../components/TextInput/TextInput';
import RichTextEditor from '../../components/richTextEditor/RichTextEditor';

const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
        pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        approved: 'bg-green-500/10 text-green-500 border-green-500/20',
        rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

const AddGame = () => {

    const [submitGame, { isLoading: isSubmitting, isError, error: apiError, isSuccess }] = useSubmitGameMutation();
    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesForDropdownQuery();
    const { data: myGamesResponse, isLoading: isLoadingMyGames, refetch: refetchMyGames } = useGetMyGamesQuery();

    const [resultModalOpen, setResultModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>("")

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useAddGameForm();

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiErrorMessage(apiError);
            setErrorMessage(errorMessage);
            setResultModalOpen(true)
        }
        if (isSuccess) {
            setErrorMessage(null);
            setResultModalOpen(true);
            setIsAddModalOpen(false);
            reset();
            refetchMyGames();
        }
    }, [isError, isSuccess, apiError, reset, refetchMyGames])

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

    const onResultModalClose = () => {
        setResultModalOpen(false)
    }

    if (isLoadingCategories || isLoadingMyGames) {
        return <Loader />
    }

    const myGames = myGamesResponse?.data || [];

    return (
        <AppWrapper>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status/Result Modal */}
                <Modal isOpen={resultModalOpen} onClose={onResultModalClose} Icon={isError ? <div className="p-4 mb-5 bg-gray rounded-full">
                    <X className='text-custom-red' strokeWidth={4} />
                </div> : isSuccess ? <div className="p-4 mb-5 bg-gray rounded-full">
                    <CheckCircle2 className='text-secondary' strokeWidth={4} />
                </div> : null}>
                    <div className="mb-5 text-center">
                        <h2 className='text-lg font-bold text-white'>{errorMessage || "Game Submitted Successfully!"}</h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            {isSuccess ? "Your game has been sent for review. Our team will check it shortly." : "There was an error while submitting your game. Please try again."}
                        </p>
                    </div>
                </Modal>

                {/* Add Game Form Section */}
                {isAddModalOpen && (
                    <div className="mb-10 bg-slate-900 border border-border/50 rounded-[2rem] animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20">
                                        <Plus className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-display font-bold text-white">Submit New Game</h2>
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                                >
                                    <X className="w-6 h-6 text-muted-foreground group-hover:text-white" />
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                                    {/* Left Column: Details */}
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Basic Information</h3>
                                            <div className="space-y-4">
                                                <TextInput
                                                    register={register}
                                                    name={'name'}
                                                    placeholder='Name of the Game *'
                                                    error={errors.name}
                                                />
                                                <div className="space-y-1">
                                                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Description <span className="text-red-500">*</span></h3>
                                                    <Controller
                                                        control={control}
                                                        name={'description'}
                                                        render={({ field: { onChange, value } }) => (
                                                            <RichTextEditor
                                                                value={value || ''}
                                                                onChange={onChange}
                                                                placeholder='Describe your game in detail...'
                                                                error={errors.description?.message}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-3 ">
                                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Engine <span className="text-red-500">*</span></h3>
                                                <Controller
                                                    control={control}
                                                    name='gameEngine'
                                                    render={({ field: { onChange, value } }) => (
                                                        <Dropdown label={value || 'Select Engine'} options={GAME_ENGINES} onChange={onChange} />
                                                    )}
                                                />
                                                {errors.gameEngine && <p className='text-custom-red text-xs mt-1'>{errors.gameEngine.message}</p>}
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Category</h3>
                                                <Controller
                                                    control={control}
                                                    name='category'
                                                    render={({ field: { onChange, value } }) => (
                                                        <Dropdown
                                                            label={value || 'Select Category'}
                                                            options={categories?.map(c => c.title) || []}
                                                            onChange={onChange}
                                                        />
                                                    )}
                                                />
                                                {errors.category && <p className='text-custom-red text-xs mt-1'>{errors.category.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Assets */}
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Game Source & Features</h3>
                                            <TextInput
                                                register={register}
                                                name='gameFile'
                                                placeholder='Game Iframe URL *'
                                                error={errors.gameFile}
                                            />
                                            <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                                <Controller
                                                    control={control}
                                                    name='multiplayer'
                                                    render={({ field: { onChange, value } }) => (
                                                        <Checkbox label='Multiplayer' value={value} onChange={onChange} />
                                                    )}
                                                />
                                                <Controller
                                                    control={control}
                                                    name='mobileSupport'
                                                    render={({ field: { onChange, value } }) => (
                                                        <Checkbox label='Mobile' value={value} onChange={onChange} />
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Thumbnail <span className="text-red-500">*</span></h3>
                                                <Controller
                                                    control={control}
                                                    name='thumbnail'
                                                    render={({ field: { onChange } }) => (
                                                        <FileInput label={'ADD THUMBNAIL'} accept={IMAGE_MEME_TYPE} onChange={onChange} />
                                                    )}
                                                />
                                                {errors.thumbnail && <p className="text-custom-red text-xs">{errors.thumbnail.message as string}</p>}
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">GIF (Optional)</h3>
                                                <Controller
                                                    control={control}
                                                    name='gif'
                                                    render={({ field: { onChange } }) => (
                                                        <FileInput label={'ADD GIF'} accept={GIF_MEME_TYPE} onChange={onChange} />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={`w-full sm:w-auto px-12 py-3 bg-secondary hover:bg-secondary/80 text-black font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(0,243,255,0.3)] flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        type='submit'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                Submit Game
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                            <Gamepad2 className="w-8 h-8 text-secondary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Developer Dashboard</h1>
                            <p className="text-muted-foreground mt-1 flex items-center gap-2">
                                <Monitor className="w-4 h-4" />
                                Manage and publish your creations
                            </p>
                        </div>
                    </div>

                    {!isAddModalOpen && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-6 py-3 bg-secondary text-black font-bold rounded-xl shadow-[0_4px_20px_rgba(0,243,255,0.4)] hover:shadow-[0_8px_30px_rgba(0,243,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                            Add New Game
                        </button>
                    )}
                </div>

                {/* Dashboard Stats (Optional/Visual) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl">
                        <p className="text-muted-foreground text-sm font-medium mb-1">Total Games</p>
                        <p className="text-3xl font-bold text-white">{myGames.length}</p>
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl">
                        <p className="text-muted-foreground text-sm font-medium mb-1">Approved</p>
                        <p className="text-3xl font-bold text-green-500">{myGames.filter(g => g.status === 'approved').length}</p>
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl">
                        <p className="text-muted-foreground text-sm font-medium mb-1">Pending Review</p>
                        <p className="text-3xl font-bold text-yellow-500">{myGames.filter(g => g.status === 'pending').length}</p>
                    </div>
                </div>

                {/* Games Table Section */}
                <div className="bg-slate-900 rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-border/50 flex items-center justify-between">
                        <h2 className="text-xl font-display font-bold text-white">Your Published Games</h2>
                    </div>

                    {myGames.length > 0 ? (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/2">
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Game</th>
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Created At</th>
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {myGames.map((game) => (
                                            <tr key={game.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 group-hover:border-secondary/50 transition-colors">
                                                            <img
                                                                src={game.thumbnail}
                                                                alt={game.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-white group-hover:text-secondary transition-colors">{game.name}</p>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                {game.mobileSupport ? <Smartphone className="w-3 h-3 text-muted-foreground" /> : <Monitor className="w-3 h-3 text-muted-foreground" />}
                                                                <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                                                                    {game.gameEngine}
                                                                </span> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-muted-foreground">
                                                        {(game.categories && game.categories.length > 0) ? game.categories[0].title : (game.category?.title || 'Game')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-0.5">
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Calendar className="w-3 h-3" />
                                                            {game.createdAt ? new Date(game.createdAt).toLocaleDateString() : 'N/A'}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60">
                                                            <Clock className="w-3 h-3" />
                                                            {game.createdAt ? new Date(game.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={game.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden p-4 space-y-4">
                                {myGames.map((game) => (
                                    <div key={game.id} className="bg-white/[0.03] rounded-2xl border border-white/10 p-4 space-y-4 hover:border-secondary/30 transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={game.thumbnail}
                                                    alt={game.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg text-white group-hover:text-secondary transition-colors">{game.name}</h3>
                                                <p className="text-xs text-secondary font-medium uppercase tracking-wider">
                                                    {(game.categories && game.categories.length > 0) ? game.categories[0].title : (game.category?.title || 'Game')}
                                                </p>
                                            </div>
                                            <StatusBadge status={game.status} />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                            <div className="space-y-1">
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Platform</p>
                                                <div className="flex items-center gap-2 text-white">
                                                    {game.mobileSupport ? <Smartphone className="w-3 h-3 text-secondary" /> : <Monitor className="w-3 h-3 text-secondary" />}
                                                    <span className="text-xs">{game.gameEngine}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Submitted</p>
                                                <div className="flex items-center gap-2 text-white">
                                                    <Calendar className="w-3 h-3 text-secondary" />
                                                    <span className="text-xs">{game.createdAt ? new Date(game.createdAt).toLocaleDateString() : 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-20 text-center">
                            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/10">
                                <AlertCircle className="w-10 h-10 text-muted-foreground/40" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Games Yet</h3>
                            <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                                You haven't submitted any games to the platform yet.
                                Click "Add New Game" to get started!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppWrapper>
    )
}

export default AddGame
