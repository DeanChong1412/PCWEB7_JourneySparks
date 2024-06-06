import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage} from "../firebase";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ReactStars from "react-rating-stars-component"; 
import firebase from "firebase/app";

export default function PostPageUpdate() {
  const params = useParams();
  const id = params.id;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("https://zca.sg/img/placeholder");
  const [user, loading] = useAuthState(auth);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  async function updatePost() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    await updateDoc(doc(db, "posts", id), { caption, image: imageUrl });
    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
    setPreviewImage(post.image);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, loading, navigate, user]);

  return (
    <div>
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
        <h1 style={{ marginBlock: "1rem" }}>Update Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Image
            src={previewImage}
            style={{
              objectFit: "cover",
              width: "10rem",
              height: "10rem",
            }}
          />

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const imageFile = e.target.files[0];
                const previewImage = URL.createObjectURL(imageFile);
                setImage(imageFile);
                setPreviewImage(previewImage);
              }}
            />
            <Form.Text className="text-muted">
              Make sure the url has an image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>

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

          <Button variant="primary" onClick={(e) => updatePost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}