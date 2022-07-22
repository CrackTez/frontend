import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter();

    const goToCreatePage = () => {
        router.push("/create");
    }

    return (
        <div>
            <div className="flex flex-row justify-between px-5 border-b-2 m-1 align-middle items-center">
                <div className='p-1 text-4xl font-bold'>
                    Writez
                </div>
                <button className='p-1 text-xl font-bold bg-amber-500 rounded-3xl text-black' onClick={goToCreatePage}>
                    Create
                </button>
            </div>
        </div>
    )
}
