// import Logo from "../Logo"
// import AccountLinks from "../AccountLinks"
// import SearchInput from "../Search"

// const Header = () => {
//     return (
//         <>
//         <header className="flex justify-between items-center pb-4 flex-wrap">
//             <Logo />
//             <SearchInput />
//             <AccountLinks />
//         </header>
//         <div className="border-b-4 m-auto w-[90%]"></div>
//         </>
//     )
// }

// export default Header

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