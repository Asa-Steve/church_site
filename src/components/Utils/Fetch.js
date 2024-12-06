// const handleSubmit = async (e, URL, formData,setData) => {
//     e.preventDefault();
//     try {
//         const res = await fetch(URL, {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ ...formData })
//         });
//         if (!res.ok) {
//             throw new Error("Failed to send message!")
//         }

//         const result = await res.json();
//         setData(result);

//         setTimeout(() => {
//             setData(null);
//             // setFormData({
//             //     fullname: "",
//             //     email: "",
//             //     msg_sub: "",
//             //     message: ""
//             // })
//         }, 2000);


//     } catch (error) {
//         setData({ msg: "Failed to send message!" });
//     }
// }

// export default handleSubmit;