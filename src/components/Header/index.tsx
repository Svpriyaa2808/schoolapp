import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import SearchInput from "../Search"

const Header = () => {
    return (
        <>
        <header className="glass-card px-4 sm:px-6 md:px-8 py-3 sm:py-4 mb-6 sm:mb-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 max-w-7xl mx-auto">
                <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                    <Logo />
                </div>
                <div className="w-full sm:w-auto flex justify-center sm:justify-center flex-1 max-w-md">
                    <SearchInput />
                </div>
                <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                    <AccountLinks />
                </div>
            </div>
        </header>
        </>
    )
}

export default Header
