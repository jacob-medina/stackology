function init() {
    $('.edit-post-btn').on('click', handleEditPost);
    $('.delete-post-btn').on('click', handleDeletePost);
}

async function handleEditPost() {
    const postId = $(this).attr('data-post-id');
    location.assign(`/blogpost/edit/${postId}`);
}

async function handleDeletePost() {
    const postId = $(this).attr('data-post-id');

    const res = await fetch(`api/blogpost/${postId}`, {
        method: 'DELETE',
    });
    
    if (!res.ok) {
        console.error((await res.json()).message);
        return;
    }

    $(`.blog-card-container[data-post-id='${postId}']`).remove();
}

$(init());