import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

function Home() {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
  });

  const [bookList, setBookList] = useState([]);

  const getAllbookList = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/book/booklist");
      setBookList(data?.BookList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllbookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !bookForm.BookName ||
        !bookForm.BookTitle ||
        !bookForm.Author ||
        !bookForm.SellingPrice
      ) {
        alert("All fields are required");
      }

      const { data } = await axios.post(
        "http://localhost:8080/book/addbook",
        bookForm,
      );

      if (data?.Success) {
        alert(data?.Message);
        setBookForm({
          BookName: "",
          BookTitle: "",
          Author: "",
          SellingPrice: "",
          PublishDate: "",
        });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("bookForm data is this", bookForm);

  return (
    <div className="w-full px-5 min-h-[calc(100vh-60px)]">
      <div className="w-full grid grid-cols-5 gap-3 my-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Name</label>

          <input
            type="text"
            placeholder="Book Name"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-8 px-2"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Title</label>

          <input
            type="text"
            placeholder="Book Title"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-8 px-2"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Author</label>

          <input
            type="text"
            placeholder="Author"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-8 px-2"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Selling Price</label>

          <input
            type="text"
            placeholder="Selling Price"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-8 px-2"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Publish Date</label>

          <input
            type="date"
            className="w-full border-2 border-gray-300 text-gray-800 rounded-sm outline-none h-8 px-2"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>

        <div className="w-full flex justify-end sm:col-span-full md:col-span-full">
          <button
            className="bg-gray-700 text-white h-9 w-22 rounded-md curser-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="w-full mt-10">
        <div className="w-full">
          <table
            className="w-full

bg-white dividely

divide-gray-200"
          >
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="tracking-wider px-6 py-3 text-left text-xs font-medium

text-gray-500 uppercase "
                >
                  Book Name
                </th>

                <th
                  className="tracking-wider px-6 py-3 text-left text-xs font-medium

text-gray-500 uppercase"
                >
                  Book Title
                </th>

                <th
                  className="tracking-wider px-6 py-3 text-left text-xs font-medium

text-gray-500 uppercase"
                >
                  Author
                </th>

                <th
                  className="tracking-wider px-6 py-3 text-left text-xs font-medium

text-gray-500 uppercase"
                >
                  Selling Price
                </th>

                <th
                  className="tracking-wider px-6 py-3 text-left text-xs font-medium

text-gray-500 uppercase"
                >
                  Publish Date
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {bookList?.map((book, index) => {
                return (
                  <tr className="hover:bg-gray-200" key={index}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.BookName}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.BookTitle}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.Author}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.SellingPrice}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.PublishDate}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="w-20 flex justify-center gap-5">
                        <div className="h-5 w-8 flex justify-center items-center bg-red-100 text-red-600 cursor-pointer" onClick={() => handleDelete(book._id)}>
                        <span>
                          <MdDelete />
                        </span>
                      </div>
                      <div className="h-5 w-8 flex justify-center items-center bg-green-100 text-green-600 cursor-pointer">
                        <span>
                         <FaPen/>
                        </span>
                      </div>
                      </div>
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
