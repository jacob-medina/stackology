$('#blog-content').on('input', function() {
    this.style.height = this.scrollHeight + 'px';
});

$('#blog-thumbnail').on('input', function() {
    $('#thumbnail').attr('src', $('#blog-thumbnail').val());
});

$('.post-blog-btn').on('click', async function() {
    const title = $('#blog-title').val().trim();
    const thumbnail = $('#blog-thumbnail').val().trim();
    const content = $('#blog-content').val();

    const res = await fetch('/api/blogpost', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            thumbnail: thumbnail,
            content: content
        })
    });

    if (!res.ok) {
        console.error(await res.json().message);
        return;
    }

    const { blogID } = await res.json();
    console.log(blogID);
    location.assign('/blogpost/' + blogID);
});