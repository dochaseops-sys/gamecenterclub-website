
const SideAd = () => {
    return (
        <aside className="hidden lg:flex w-16 pt-20 lg:w-64 h-screen float-end right-0 top-0 bg-card z-40 flex-col transition-all duration-300">
            <div className="w-full h-full place-items-center border-l border-border">

                <div className="p-8 h-4/5 place-items-center mb-7 bg-border rounded-md">
                    <p className="text-gray">Advertisement</p>
                </div>
                {/* <img src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-4/5' /> */}
            </div>
        </aside>
    )
}

export default SideAd
