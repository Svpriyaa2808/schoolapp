import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import SearchInput from "../Search"

const Header = () => {
    return (
        <>
        <header className="glass-card px-8 py-4 mb-8 animate-fadeIn">
            <div className="flex justify-between items-center flex-wrap gap-4 max-w-7xl mx-auto">
                <Logo />
                <SearchInput />
                <AccountLinks />
            </div>
        </header>
        </>
    )
}

export default Header