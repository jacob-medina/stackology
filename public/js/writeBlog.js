$('#blog-content').on('input', function() {
    this.style.height = this.scrollHeight + 'px';
});

$('#blog-thumbnail').on('input', function() {
    $('#thumbnail').attr('src', $('#blog-thumbnail').val());
});

function getPostData() {
    return {
        title: $('#blog-title').val().trim(),
        thumbnail: $('#blog-thumbnail').val().trim(),
        content: $('#blog-content').val()
    };
}

// document.getElementById('blog-content').setRangeText($('#blog-content').attr('value'));


$('.post-blog-btn').on('click', async function() {
    const { title, thumbnail, content } = getPostData();

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
    location.assign('/blogpost/' + blogID);
});

$('.update-blog-btn').on('click', async function() {
    const { title, thumbnail, content } = getPostData();

    const blogID = location.href.split('/')[location.href.split('/').length - 1];

    const res = await fetch(`/api/blogpost/${blogID}`, {
        method: 'PUT',
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
        console.error((await res.json()).message);
        return;
    }

    location.assign(`/blogpost/${blogID}`);
});