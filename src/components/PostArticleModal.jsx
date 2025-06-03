import { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "react-modal";
import PostArticleForm from "./PostArticleForm";
import { useSidebar } from "../Contexts/SidebarContext";

export default function PostArticleModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const {setIsSidebarOpen} = useSidebar();

  const openModal = () => {
    setIsSidebarOpen(false);
    setModalIsOpen(true);
  }
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <button onClick={openModal}>Post New Article</button>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Post New Article"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} style={{ float: "right" }}>X</button>
        <h2>New Article</h2>
        
        <PostArticleForm
          onSuccess={(article) => {
            closeModal();
            navigate(`/articles/${article.article_id}`);
          }}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
}
