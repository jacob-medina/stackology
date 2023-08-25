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
        console.error(await res.json().message);
        return;
    }

    const data = await res.json();

    const date_created = (await (await fetch(`/api/helper/formatDate/${data.date_created}`)).json()).date ?? '';

    $('.new-comment-card .card-body').empty();
    $('.new-comment-card .card-body').append(
        `<p class="fst-italic mb-0">Thanks for commenting!</p>`
    );
    $(
`<div class="card mt-3 col-sm-10 col-md-10 col-lg-7">
<div class="card-body">
  <a href="/user/${data.user_id}" class="fs-5 green-link">${data.user_name}</a>
  <p>${data.text}</p>
  <small class="text-body-secondary">${date_created}</small>
</div>
</div>`).insertAfter('.new-comment-card');
}

$(init());