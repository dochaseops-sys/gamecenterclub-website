import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
    label: string;
    options: string[];
    onChange: (item: string) => void
}

const Dropdown = ({ label, options, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onSelect = (item: string) => {
        onChange(item)
        setIsOpen(false);
    }

    return (
        <div className={`relative ${isOpen ? 'z-50' : 'z-10'}`}>
            <button
                onClick={toggleDropdown}
                type="button"
                className="w-full flex items-center justify-between h-12 px-4 bg-primary border border-white/10 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none text-white placeholder-muted-foreground transition-all hover:border-secondary/50"
            >
                <span className="truncate">{label}</span>
                {
                    isOpen ? <ArrowUp className="w-4 h-4 text-secondary" /> : <ArrowDown className="w-4 h-4 text-secondary" />
                }
            </button>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 left-0 mt-2 
                    rounded-md shadow-lg shadow-black/50 bg-[#1A1A1A] border border-secondary/20
                    focus:outline-none max-h-60 overflow-y-auto"
                    role="menu"
                >
                    <div className="py-1" role="none">
                        {
                            options.map(item => (
                                <button className="w-full py-2.5 px-4 text-sm text-left text-slate-500  hover:text-white hover:bg-primary/10 cursor-pointer transition-colors"
                                    type="button"
                                    role="menuitem" onClick={() => onSelect(item)} key={item}>
                                    {item}
                                </button>
                            ))
                        }
                    </div>
                </div>
            )}

        </div>
    )
}

export default Dropdown
