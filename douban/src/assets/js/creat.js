
        // 电影名，评分，评分人数，时长，导演，演员，大陆上映时间，简介，影人，短评，讨论，影评。。。短评数,影评数
        export default class Movie {
            constructor({ id, title, rating, ratings_count, images, durations, directors, writers, mainland_pubdate, summary, reviews_count, comments_count, photos, popular_reviews }) {
                // 电影ID
                this.id = id
                // 电影名
                this.title = title
                // 电影评分
                this.rating = rating
                // 电影评分人数
                this.ratings_count = ratings_count
                // 图片
                this.images = images
                // 电影片长
                this.durations = durations
                // 导演
                this.directors = directors
                // 影人
                this.writers = writers
                // 大陆上映时间
                this.mainland_pubdate = mainland_pubdate
                // 简介
                this.summary = summary
                // 短评数量
                this.reviews_count = reviews_count
                // 影评数量
                this.comments_count = comments_count
                // 剧照
                this.photos = photos
                // 影评  前10 条
                this.popular_reviews = popular_reviews
            }
        }
        
        export function creatMovie (movie) {
            return new Movie({
                id: movie.id,
                title: movie.title,
                rating: movie.ratings,
                ratings_count: movie.ratings_count,
                images: mov.images,
                durations: movie.durations,
                directors: movie.durations,
                writers: movie.writers,
                mainland_pubdate: movie.mainland_pubdate,
                summary: movie.summary,
                reviews_count: movie.reviews_count,
                comments_count: movie.comments_count,
                photos: movie.photos,
                popular_reviews: movie.popular_reviews
            })
        }

        
        // 电影名，评分，评分人数，时长，导演，演员，大陆上映时间，简介，影人，短评，讨论，影评。。。短评数,影评数
        export default class Book {
            constructor({ id, title, rating, binding, price, tags, summary, ebook_price, publisher }) {
                // 电影ID
                this.id = id
                // 电影名
                this.title = title
                // 电影评分
                this.rating = rating
                // 简介
                this.summary = summary
                // 
                this.binding = binding
                // 
                this.price = price
                // 
                this.tags = tags
                // 
                this.ebook_price = ebook_price
                // 
                this.publisher = publisher
            }
        }
        
        export function creatBook (book) {
            return new Book({
                id: book.id,
                title: book.title,
                rating: book.rating,
                summary: book.summary,
                binding: book.binding,
                price: book.price,
                tags: book.tags,
                ebook_price: book.ebook_price,
                publisher: book.publisher
            })
        }