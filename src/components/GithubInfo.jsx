import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
const GithubInfo = () => {
    const [input, setInput] = useState("");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getUserData(username) {
        try {
            setLoading(true);
            const res = await fetch(`https://api.github.com/users/${username}`);
            const user = await res.json();
            setLoading(false);
            setUserData(user);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }

    function handleSearchUser(e) {
        e.preventDefault();
        getUserData(input);
    }

    console.log(userData);

    return (
        <div className='w-full mx-[200px] flex flex-col justify-center items-center my-[100px]'>
            <h1 className='text-4xl text-red-400'> See Github User Info</h1>
            <form onSubmit={handleSearchUser}>
                <div className='field my-12 flex'>
                    <input
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        value={input}
                        className='border border-red-500 py-2 px-5 rounded-l outline-none text-gray-500'
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Enter Github username'
                    />
                    <button
                        className='flex gap-2 justify-center items-center bg-red-500 hover:bg-red-400 transform duratred-500 transition-all py-2 px-5 border border-transparent rounded-r text-white'
                        type='submit'>
                        <MdPersonSearch /> Search User
                    </button>
                </div>
            </form>

            {loading && <p className='text-gray-600 ml-2'>Loading user...</p>}
            {error && <p className='text-red-500'>No User Found</p>}
            {userData && userData.login ? (
                <div className='user-details flex'>
                    <div className='left w-1/2'>
                        {userData.avatar_url && (
                            <img
                                src={userData.avatar_url}
                                alt='deveripon'
                            />
                        )}
                    </div>
                    <div className='right w-1/2 flex justify-start flex-col items-start'>
                        {userData.login && (
                            <p className='font-normal text-red-500 text-2xl'>
                                Username:
                                <span className='text-gray-600 ml-2'>
                                    {userData.login}
                                </span>
                            </p>
                        )}

                        {userData.name && (
                            <p className='font-normal text-red-500 text-2xl'>
                                name:
                                <span className='text-gray-600 ml-2'>
                                    {userData.name}
                                </span>
                            </p>
                        )}
                        {userData.followers && (
                            <p className='font-normal text-red-500 text-2xl'>
                                followers:
                                <span className='text-gray-600 ml-2'>
                                    {userData.followers}
                                </span>
                            </p>
                        )}

                        {userData.following && (
                            <p className='font-normal text-red-500 text-2xl'>
                                following:
                                <span className='text-gray-600 ml-2'>
                                    {userData.following}
                                </span>
                            </p>
                        )}
                        {userData.public_repos && (
                            <p className='font-normal text-red-500 text-2xl'>
                                repositories:
                                <span className='text-gray-600 ml-2'>
                                    {userData.public_repos}
                                </span>
                            </p>
                        )}

                        {userData.company && (
                            <p className='font-normal text-red-500 text-2xl'>
                                company:
                                <span className='text-gray-600 ml-2'>
                                    {userData.company}
                                </span>
                            </p>
                        )}

                        {userData.location && (
                            <p className='font-normal text-red-500 text-2xl'>
                                location:
                                <span className='text-gray-600 ml-2'>
                                    {userData.location}
                                </span>
                            </p>
                        )}

                        {userData.bio && (
                            <p className='font-normal text-red-500 text-2xl'>
                                bio :
                                <span className='text-gray-600 ml-2'>
                                    {userData.bio}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                "No Account Found  ||  Search An Account by username"
            )}
        </div>
    );
};

export default GithubInfo;

