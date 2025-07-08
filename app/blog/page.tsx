import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function BlogPage() {
  // Mock blog posts
  const blogPosts = [
    {
      id: 1,
      title: "5 Effective Study Techniques for Better Learning",
      excerpt: "Discover research-backed study methods that can help you retain information longer and learn more efficiently.",
      author: "Dr. Emily Chen",
      date: "May 15, 2023",
      category: "Study Tips",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "How to Prepare for College Entrance Exams",
      excerpt: "A comprehensive guide to preparing for SAT, ACT, and other standardized tests with a strategic approach.",
      author: "Michael Johnson",
      date: "April 28, 2023",
      category: "Test Prep",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "The Benefits of One-on-One Tutoring",
      excerpt: "Research shows that personalized tutoring can significantly improve academic performance. Here's why it works.",
      author: "Sarah Williams",
      date: "April 10, 2023",
      category: "Education",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Overcoming Math Anxiety: A Guide for Students",
      excerpt: "Practical strategies to help students overcome fear and anxiety related to mathematics and build confidence.",
      author: "Dr. Robert Thompson",
      date: "March 22, 2023",
      category: "Mathematics",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "How to Choose the Right Tutor for Your Child",
      excerpt: "Finding the perfect tutor involves more than just academic credentials. Learn what factors to consider.",
      author: "Jennifer Davis",
      date: "March 5, 2023",
      category: "Parenting",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "The Future of Education: Trends to Watch",
      excerpt: "From AI-powered learning to microlearning, discover the educational trends that are shaping the future.",
      author: "Dr. James Wilson",
      date: "February 18, 2023",
      category: "Education Technology",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ]

  // Categories for filter
  const categories = ["All", "Study Tips", "Test Prep", "Education", "Mathematics", "Parenting", "Education Technology"]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">TutorMatch Blog</h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Insights, tips, and resources to help you succeed in your educational journey.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-0">
                <span className="text-sm font-medium">By {post.author}</span>
                <Button variant="ghost" size="sm">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline">Load More Articles</Button>
        </div>
      </div>
    </div>
  )
}
