import { useEffect, useState } from "react";
import { Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth"
import firebase from "firebase/app";

export default function PostPageHome() {
  const [posts, setPosts] = useState([]);

   async function getAllPosts() {
    const query = await getDocs(collection(db, "posts"));
    const posts = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

//   return (
//     <>
//       <Navbar variant="light" bg="light">
//         <Container>
//           <Navbar.Brand href="/">JourneySparks</Navbar.Brand>
//           <Nav>
//             <Nav.Link href="/add">New Post</Nav.Link>
//             <Nav.Link onClick={(e) => signOut(auth)}>BuhBye👋</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//       <Container>
//         <Row>
//           <ImagesRow />
//         </Row>
//       </Container>
//     </>
//   );
// }

// function ImageSquare({ post }) {
//   const { image, id } = post;
//   return (
//     <Link
//       to={`post/${id}`}
//       style={{
//         width: "18rem",
//         marginLeft: "1rem",
//         marginTop: "2rem",
//       }}
//     >
//       <Image
//         src={image}
//         style={{
//           objectFit: "cover",
//           width: "18rem",
//           height: "18rem",
//         }}
//       />
//     </Link>
//   );
// }

return (
  <>
    <Navbar className="navbar-happy" variant="light">
      <Container>
        <Navbar.Brand className="navbar-brand-happy" href="/">
          JourneySparks
        </Navbar.Brand>
        <Nav>
          <Nav.Link className="nav-link-happy" href="/add">
            New Post
          </Nav.Link>
          <Nav.Link
            className="nav-link-happy"
            onClick={(e) => signOut(auth)}
          >
            BuhBye👋
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Container>
      <Row>
        <ImagesRow />
      </Row>
    </Container>
  </>
);
}

function ImageSquare({ post }) {
const { image, id } = post;
return (
  <Link
    to={`post/${id}`}
    style={{
      width: "18rem",
      marginLeft: "1rem",
      marginTop: "2rem",
    }}
  >
    <Image
      src={image}
      style={{
        objectFit: "cover",
        width: "18rem",
        height: "18rem",
      }}
    />
  </Link>
);
}
