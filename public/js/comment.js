function init() {
    $('.new-comment-btn').on('click', handleNewComment);
}

async function handleNewComment() {
    const blogID = location.href.split('/')[location.href.split('/').length - 1];
    const commentText = $('#new-comment').val()

    const res = await fetch('/api/comment', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: commentText,
            blog_post_id: blogID
        })
    });

    if (!res.ok) {
        console.error(res.json().message);
        return;
    }

    $('.new-comment-card .card-body').empty();
    $('.new-comment-card .card-body').append(
        `<p class="fst-italic">Thanks for commenting!</p>`
    );
    $(
`<div class="card mt-3 col-sm-10 col-md-10 col-lg-7">
    <div class="card-body">
        <strong class="fs-5">You</strong>
        <p>${commentText}</p>
    </div>
</div>`).insertAfter('.new-comment-card');
}

$(init());