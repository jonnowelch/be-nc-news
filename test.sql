\c nc_news_test

select * from articles_table
left join comments_table on articles_table.article_id = comments_table.article_id;

