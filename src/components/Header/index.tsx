import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import SearchInput from "../Search"

const Header = () => {
    return (
        <>
        <header className="flex justify-between items-center pb-4 flex-wrap">
            <Logo />
            <SearchInput />
            <AccountLinks />
        </header>
        <div className="border-b-4 m-auto w-[90%]"></div>
        </>
    )
}

export default Header