import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'The Simpsons API Documentation',
        version: '1.0.0',
        description: 'API documentation for The Simpsons application',
        contact: {
          name: 'Juan Diaz',
          email: 'contact@jpdiaz.dev',
          url: 'https://jpdiaz.dev',
          linkedin: 'https://linkedin.com/in/ju1diazdev',
          github: 'https://github.com/ju1diazdev',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local development server',
        },
        {
          url: 'https://losimpson.vercel.app',
          description: 'Production server',
        },
      ],
      tags: [
        {
          name: 'Characters',
          description: 'Operations related to Simpsons characters',
        },
        {
          name: 'Episodes',
          description: 'Operations related to Simpsons episodes',
        },
        {
          name: 'Products',
          description: 'Operations related to Simpsons products',
        },
      ],
      paths: {
        '/api/characters': {
          get: {
            summary: 'Retrieves a list of all Simpsons characters',
            tags: ['Characters'],
            responses: {
              '200': {
                description: 'A list of characters',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        characters: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Character'
                          }
                        }
                      }
                    }
                  }
                }
              },
              '500': {
                description: 'Server error'
              }
            }
          }
        },
        '/api/characters/{slug}': {
          get: {
            summary: 'Retrieves a specific Simpsons character by slug',
            tags: ['Characters'],
            parameters: [
              {
                in: 'path',
                name: 'slug',
                required: true,
                schema: {
                  type: 'string'
                },
                description: 'The slug of the character'
              }
            ],
            responses: {
              '200': {
                description: 'Character details',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        character: {
                          $ref: '#/components/schemas/Character'
                        },
                        character_quotes: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              quote: {
                                type: 'string'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              '404': {
                description: 'Character not found'
              },
              '500': {
                description: 'Server error'
              }
            }
          }
        },
        '/api/episodes': {
          get: {
            summary: 'Retrieves a list of all Simpsons episodes',
            tags: ['Episodes'],
            responses: {
              '200': {
                description: 'A list of episodes',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        episodes: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Episode'
                          }
                        }
                      }
                    }
                  }
                }
              },
              '500': {
                description: 'Server error'
              }
            }
          }
        },
        '/api/episodes/{slug}': {
          get: {
            summary: 'Retrieves a specific Simpsons episode by slug',
            tags: ['Episodes'],
            parameters: [
              {
                in: 'path',
                name: 'slug',
                required: true,
                schema: {
                  type: 'string'
                },
                description: 'The slug of the episode'
              }
            ],
            responses: {
              '200': {
                description: 'Episode details',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        episode: {
                          allOf: [
                            { $ref: '#/components/schemas/Episode' },
                            {
                              type: 'object',
                              properties: {
                                characters: {
                                  type: 'array',
                                  items: {
                                    type: 'string'
                                  }
                                },
                                director: {
                                  type: 'string'
                                },
                                writer: {
                                  type: 'string'
                                },
                                funFacts: {
                                  type: 'array',
                                  items: {
                                    type: 'string'
                                  }
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              },
              '404': {
                description: 'Episode not found'
              },
              '500': {
                description: 'Server error'
              }
            }
          }
        },
        '/api/products': {
          get: {
            summary: 'Retrieves a list of all Simpsons products',
            tags: ['Products'],
            responses: {
              '200': {
                description: 'A list of products',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        products: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Product'
                          }
                        }
                      }
                    }
                  }
                }
              },
              '500': {
                description: 'Server error'
              }
            }
          }
        },
        '/api/products/{slug}': {
          get: {
            summary: 'Retrieves a specific Simpsons product by slug',
            tags: ['Products'],
            parameters: [
              {
                in: 'path',
                name: 'slug',
                required: true,
                schema: {
                  type: 'string'
                },
                description: 'The slug of the product'
              }
            ],
            responses: {
              '200': {
                description: 'Product details',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        product: {
                          allOf: [
                            { $ref: '#/components/schemas/Product' },
                            {
                              type: 'object',
                              properties: {
                                details: {
                                  type: 'string'
                                },
                                mainImage: {
                                  type: 'string'
                                },
                                images: {
                                  type: 'array',
                                  items: {
                                    type: 'string'
                                  }
                                },
                                price: {
                                  type: 'string'
                                },
                                inStock: {
                                  type: 'boolean'
                                },
                                rating: {
                                  type: 'string'
                                },
                                relatedProducts: {
                                  type: 'array',
                                  items: {
                                    type: 'string'
                                  }
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              },
              '404': {
                description: 'Product not found'
              },
              '500': {
                description: 'Server error'
              }
            }
          }
        }
      },
      components: {
        schemas: {
          Character: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              normalized_name: { type: 'string' },
              gender: { type: 'string' },
              slug: { type: 'string' },
              avatar: { type: 'string' },
              description: { type: 'string' },
            },
          },
          Episode: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              slug: { type: 'string' },
              season: { type: 'integer' },
              episode: { type: 'integer' },
              description: { type: 'string' },
              rating: { type: 'number' },
              airDate: { type: 'string', format: 'date-time' },
              thumbnailUrl: { type: 'string' },
            },
          },
          Product: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              slug: { type: 'string' },
              category: { type: 'string' },
              description: { type: 'string' },
              image: { type: 'string' },
            },
          },
        },
      },
    },
  });
  return spec;
};
