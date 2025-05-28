import { useState } from "react";
import Modal from "react-modal";
import PostArticleForm from "./PostArticleForm";

export default function PostArticleModal({onArticlePosted }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <button onClick={openModal}>Post New Article</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Post New Article"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
          content: { maxWidth: "500px", margin: "auto" }
        }}
      >
        <button onClick={closeModal} style={{ float: "right" }}>X</button>
        <h2>New Article</h2>
        
        {/* Only rendering first field for now */}
        <PostArticleForm
          onSuccess={(article) => {
            onArticlePosted(article); // pass article up if you want
            closeModal();
          }}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
}
