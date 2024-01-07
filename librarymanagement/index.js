document.addEventListener("DOMContentLoaded", () => {
  const membersContainer = document.getElementById("members-container");
  const booksContainer = document.getElementById("books-container");
  const transactionsContainer = document.getElementById("transactions-container");

  const addMemberForm = document.getElementById("add-member-form");
  const editMemberForm = document.getElementById("edit-member-form");
  const deleteMemberForm = document.getElementById("delete-member-form");

  const addBookForm = document.getElementById("add-book-form");
  const editBookForm = document.getElementById("edit-book-form");
  const deleteBookForm = document.getElementById("delete-book-form");

  const issueForm = document.getElementById("issueForm");
  const ReturnForm = document.getElementById("ReturnForm");

  const allMembers = document.getElementById("all-members");
  const allBooks = document.getElementById("all-Books");
  const allActions = document.getElementById("all-Actions");

  const fetchAllMembers = async () => {
    try {
      const response = await fetch("http://localhost:7000/members");
      const data = await response.json();

      membersContainer.innerHTML = "";

      data.members.forEach((member) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${member._id}</td>
          <td>${member.name}</td>
          <td>${member.email}</td>
         
        `;

        membersContainer.appendChild(row);
      });
    } catch (error) {
      console.error(error);
    }
  };

 

  const addMember = async ( name, email,) => {
    try {
      const response = await fetch(`http://localhost:7000/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email,}),
      });

      const data = await response.json();
      console.log(data);

     
      await fetchAllMembers();

      document.getElementById("memberName").value = "";
      document.getElementById("memberEmail").value = "";
    } catch (error) {
      console.error(error);
    }
  };
  const editMember = async (id, name, email) => {
    try {
      const response = await fetch(`http://localhost:7000/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();
      console.log(data);

     
      await fetchAllMembers();
      document.getElementById("memberName").value = "";
      document.getElementById("memberEmail").value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMember = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/members/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
    console.log(data);

      
      await fetchAllMembers();
     
     
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await fetch("http://localhost:7000/books");
      const data = await response.json();

      booksContainer.innerHTML = ""; 

      data.books.forEach((book) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${book._id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          
        `;

        booksContainer.appendChild(row);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addBook = async (title, author) => {
    try {
      const response = await fetch("http://localhost:7000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });

      const data = await response.json();
    console.log(data);

      
      await fetchAllBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const editBook = async (id, title, author) => {
    try {
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });

      const data = await response.json();
     console.log(data);

     
      await fetchAllBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (_id) => {
    try {
      const response = await fetch(`http://localhost:7000/books/${_id}`, {
        method: "DELETE",
      });

      const data = await response.json();
   console.log(data);

     
      await fetchAllBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllTransactions = async () => {
    try {
      const response = await fetch("http://localhost:7000/transactions");
      const data = await response.json();

      transactionsContainer.innerHTML = ""; 

      data.transactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${transaction._id}</td>
          <td>${transaction.memberId}</td>
          <td>${transaction.action}</td>
        `;

        transactionsContainer.appendChild(row);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const issueBook = async (memberId, bookId) => {
    try {
      const response = await fetch("http://localhost:7000/transactions/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberId, bookId }),
      });

      const data = await response.json();
      console.log(data);

     
      await fetchAllTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  const returnBook = async (returnMemberId, returnBookId) => {
    try {
      const response = await fetch("http://localhost:7000/transactions/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ returnMemberId, returnBookId }),
      });

      const data = await response.json();
      console.log(data);

      
      await fetchAllTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  addMemberForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const memberName = document.getElementById("memberName").value;
    const memberEmail = document.getElementById("memberEmail").value;
    await addMember(memberName, memberEmail );
  });

  editMemberForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const memberId = document.getElementById("editMemberId").value;
    const newName = document.getElementById("editMemberName").value;
    const newEmail = document.getElementById("editMemberEmail").value;
    await editMember(memberId, newName, newEmail);
  });

  deleteMemberForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const memberId = document.getElementById("deleteMemberId").value;
    await deleteMember(memberId);
  });

  addBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    await addBook(bookTitle, bookAuthor);
  });

  editBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const bookId = document.getElementById("editBookId").value;
    const newTitle = document.getElementById("editBookTitle").value;
    const newAuthor = document.getElementById("editBookAuthor").value;
    await editBook(bookId, newTitle, newAuthor);
  });

  deleteBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const bookId = document.getElementById("deleteBookId").value;
    await deleteBook(bookId);
  });



  issueForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const memberId = document.getElementById("issueMemberId").value;
    const bookId = document.getElementById("issueBookId").value;
    await issueBook(memberId, bookId ,);
  });

  if (ReturnForm){
    ReturnForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const returnMemberId = document.getElementById("returnMemberId").value;
    const returnBookId = document.getElementById("returnBookId").value;
    await returnBook(returnMemberId, returnBookId); 
  });
} else{
  console.error('returnForm not found')
} 

  

let membersVisible = false;
allMembers.addEventListener("click", async () => {
  if (membersVisible) {
    membersContainer.style.display = "none";
    membersVisible = false;
  } else {
    await fetchAllMembers();
   
    membersVisible = true;
  }
});


let booksVisible = false;
allBooks.addEventListener("click", async () => {
  if (booksVisible) {
    booksContainer.style.display = "none";
    booksVisible = false;
  } else {
    await fetchAllBooks();
   
    booksVisible = true;
  }
});

let ActionVisible = false;
allActions.addEventListener("click", async () => {
  if (ActionVisible) {
    transactionsContainer.style.display = "none";
    ActionVisible = false;
  } else {
    await fetchAllTransactions();``
   
    ActionVisible = true;
  }
});
});
