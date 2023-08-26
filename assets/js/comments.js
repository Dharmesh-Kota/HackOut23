{
    // deleting comments using ajax
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    let commentList = $('#comment-list>ul>li');
    commentList.each(function(){
        deleteComment($(' .destroy-comments', this));
    })

    // Creating new comment using ajax
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({

                type: 'post',
                url: '/project/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment, data.data.user_name);
                    $('#comment-list>ul').prepend(newComment);
                    deleteComment($(' .destroy-comments', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    
    let newCommentDom = function(comment, user_name){
        return $(`<li id="comment-${comment._id}">
                    <p>
                        <a href="/project/comments/destroy/${comment.id}" class="destroy-comments">X</a>

                        ${ comment.content }
                        <br>

                        <small>
                        ${user_name}
                        </small>
                    </p>
                </li>`);
    }

    console.log('Entered');
    createComment();
}