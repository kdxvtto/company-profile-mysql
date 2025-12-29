/**
 * Button Component - Menggunakan shadcn/ui + Radix Primitives
 * 
 * shadcn/ui Button sudah ada di: @/components/ui/button
 * File ini hanya contoh cara penggunaan
 */

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bookmark, ArrowRight, Mail, Loader2 } from "lucide-react";

// ============================================================================
// CONTOH PENGGUNAAN BUTTON
// ============================================================================

// 1. VARIANT - Style button
export function ButtonVariants() {
    return (
        <div className="flex gap-4">
            {/* Default - warna primary */}
            <Button variant="default">Default</Button>
            
            {/* Secondary - warna abu */}
            <Button variant="secondary">Secondary</Button>
            
            {/* Outline - border saja */}
            <Button variant="outline">Outline</Button>
            
            {/* Ghost - transparan, hover ada background */}
            <Button variant="ghost">Ghost</Button>
            
            {/* Destructive - warna merah untuk delete/danger */}
            <Button variant="destructive">Delete</Button>
            
            {/* Link - seperti text link */}
            <Button variant="link">Link</Button>
        </div>
    );
}

// 2. SIZE - Ukuran button
export function ButtonSizes() {
    return (
        <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium (default)</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
                <Bookmark className="h-4 w-4" />
            </Button>
        </div>
    );
}

// 3. DENGAN ICON
export function ButtonWithIcon() {
    return (
        <div className="flex gap-4">
            {/* Icon di kiri */}
            <Button>
                <Mail className="mr-2 h-4 w-4" />
                Login with Email
            </Button>
            
            {/* Icon di kanan */}
            <Button>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Icon only */}
            <Button size="icon" variant="outline">
                <Bookmark className="h-4 w-4" />
            </Button>
        </div>
    );
}

// 4. LOADING STATE
export function ButtonLoading() {
    return (
        <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
        </Button>
    );
}

// 5. DISABLED
export function ButtonDisabled() {
    return (
        <Button disabled>
            Disabled Button
        </Button>
    );
}

// 6. AS CHILD - Render sebagai element lain (misal: link)
// Menggunakan Radix Slot untuk polymorphic component
export function ButtonAsLink() {
    return (
        <Button asChild>
            <Link to="/apply">Go to Application</Link>
        </Button>
    );
}

// ============================================================================
// CONTOH PENGGUNAAN DI HALAMAN
// ============================================================================

export function HeroButtons() {
    return (
        <div className="flex gap-4">
            <Button size="lg">
                Ajukan Kredit
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
                Pelajari Lebih Lanjut
            </Button>
        </div>
    );
}

export function FormButtons() {
    return (
        <div className="flex justify-between">
            <Button variant="ghost">
                ← Sebelumnya
            </Button>
            <Button>
                Selanjutnya →
            </Button>
        </div>
    );
}

export function CardActionButton() {
    return (
        <Button variant="link" className="p-0">
            Selengkapnya →
        </Button>
    );
}