"use client"

import { useState } from "react"
import { useTeacherOnboardingStore, Certification } from "@/lib/stores/teacher-onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Plus, Trash2, FileCheck } from "lucide-react"

export function CertificationsStep() {
  const {
    certifications,
    addCertification,
    removeCertification
  } = useTeacherOnboardingStore()

  const [newCertification, setNewCertification] = useState<Certification>({
    name: "",
    issuer: "",
    year: ""
  })

  const handleAddCertification = () => {
    if (
      newCertification.name.trim() &&
      newCertification.issuer.trim() &&
      newCertification.year.trim()
    ) {
      addCertification({...newCertification})
      setNewCertification({
        name: "",
        issuer: "",
        year: ""
      })
    }
  }

  const isFormValid = () => {
    return (
      newCertification.name.trim() &&
      newCertification.issuer.trim() &&
      newCertification.year.trim()
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Certifications</h2>
        <p className="text-muted-foreground mb-6">
          Add any teaching certifications, licenses, or professional credentials you hold.
        </p>
      </div>

      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Add Certification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-1">
              <Label htmlFor="name">Certification Name</Label>
              <Input
                id="name"
                value={newCertification.name}
                onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                placeholder="e.g., Teaching License"
              />
            </div>

            <div className="md:col-span-1">
              <Label htmlFor="issuer">Issuing Organization</Label>
              <Input
                id="issuer"
                value={newCertification.issuer}
                onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
                placeholder="e.g., State Board of Education"
              />
            </div>

            <div className="md:col-span-1">
              <Label htmlFor="year">Year Obtained</Label>
              <Input
                id="year"
                value={newCertification.year}
                onChange={(e) => setNewCertification({...newCertification, year: e.target.value})}
                placeholder="e.g., 2020"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddCertification}
            disabled={!isFormValid()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Certification
          </Button>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-medium mb-3">Your Certifications</h3>

        {certifications.length > 0 ? (
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <Card key={index} className="bg-primary/5 border-primary/10">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-3">
                      <FileCheck className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer}, {cert.year}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No certifications added yet. Add your certifications above.
          </p>
        )}
      </div>
    </div>
  )
}
