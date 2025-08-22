import React from 'react'

export default function Orders() {
  // ---------------------- Logic to check if user is authorized else redirect to login ---------------------- \\
  // UseEffect to cal the the user detail api on render
  useEffect(() => {
    // Function to get user detail from API
    const fetchUser = async () => {
      const user = await getAdminUserDetail();
      console.log(user);
      setUserDetail(user);
      // Check user autorized
      if (!user.success) {
        navigate('/admin/login');
      }
    };

    fetchUser();
  }, []);
  //  ----------------------------------- ****************** ----------------------------------- \\


  return (
    <div>Orders</div>
  )
}
