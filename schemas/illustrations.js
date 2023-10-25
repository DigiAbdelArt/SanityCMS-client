import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'illustrations',
  title: 'Illustrations',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'document'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images gallery',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'colSpan',
              type: 'string',
              title: 'Column span',
              description: 'How many columns this image should span i.e(1, 2, 3, 6)',
              options: {
                list: [
                  {title: '(1/6) 16.67%', value: 'span 1 / span 1'},
                  {title: '(2/6) 33.33%', value: 'span 2 / span 2'},
                  {title: '(3/6) 50.00%', value: 'span 3 / span 3'},
                  {title: '(4/6) 66.67%', value: 'span 4 / span 4'},
                  {title: '(5/6) 83.33%', value: 'span 5 / span 5'},
                  {title: '(6/6) 100.00%', value: 'span 6 / span 6'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      options: {
        layout: 'grid',
      },
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockContent',
      validation: (Rule) =>
        Rule.required().error(
          'make sure to add the excerpt to let your audience know more about your illustrations',
        ),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'images.0.asset',
    },
    prepare(selection) {
      console.log(selection)
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
