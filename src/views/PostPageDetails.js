import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Nav, Navbar, Row, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth"
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import ReactStars from "react-rating-stars-component"; 

export default function PostPageDetails() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  async function deletePost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    await deleteDoc(doc(db, "posts", id));

    // Try to get the images/x.jpeg file path out of the full path
    const url = new URL(post.image);
    const pathParts = url.pathname.split("/");
    let refPath = pathParts[pathParts.length - 1];
    refPath = decodeURIComponent(refPath);
    console.log(refPath);

    const imageReference = ref(storage, refPath);
    await deleteObject(imageReference);

    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);

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
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card className="card-happy">
              <Card.Body>
                <Card.Text className="card-text-happy">{caption}</Card.Text>
                <Card.Link className="card-link-happy" href={`/update/${id}`}>
                  Edit
                </Card.Link>
                <Card.Link
                  className="card-link-happy"
                  onClick={() => deletePost(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <ReactStars
                count={5}
                size={24}
                onChange={(newRating) => setRating(newRating)} // Update rating state when the user selects a rating
                value={rating} // Set the initial value of the rating
                 activeColor="#FFD700" // Star color when selected
              />
            </Form.Group>
            </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}