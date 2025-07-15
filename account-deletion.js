document.addEventListener('DOMContentLoaded', function() {
    const deletionForm = document.getElementById('deletionForm');
    const successMessage = document.getElementById('successMessage');
    
    // Email configuration - Replace with your actual email
    const SUPPORT_EMAIL = '[سيتم إضافة البريد الإلكتروني]'; // Replace with your actual email
    
    deletionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(deletionForm);
        const data = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            reason: formData.get('reason'),
            details: formData.get('details') || 'لا توجد تفاصيل إضافية',
            dataExport: formData.get('dataExport') ? 'نعم' : 'لا',
            confirmation: formData.get('confirmation') ? 'نعم' : 'لا'
        };
        
        // Validate required fields
        if (!data.fullName || !data.email || !data.phone || !data.reason) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        // Validate phone number (basic validation)
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            alert('يرجى إدخال رقم هاتف صحيح');
            return;
        }
        
        // Check confirmation checkbox
        if (!formData.get('confirmation')) {
            alert('يجب تأكيد فهم سياسة حذف البيانات');
            return;
        }
        
        // Prepare email content
        const emailSubject = encodeURIComponent('طلب حذف حساب InstaNota - ' + data.fullName);
        const emailBody = encodeURIComponent(`
طلب حذف حساب InstaNota (إنستانوتا)

معلومات الطلب:
================
الاسم الكامل: ${data.fullName}
البريد الإلكتروني: ${data.email}
رقم الهاتف: ${data.phone}
سبب الحذف: ${data.reason}
تفاصيل إضافية: ${data.details}
طلب تصدير البيانات: ${data.dataExport}
تأكيد الفهم: ${data.confirmation}

تاريخ الطلب: ${new Date().toLocaleString('ar-EG')}

ملاحظة: هذا طلب حذف حساب من تطبيق InstaNota (إنستانوتا).
يرجى معالجة الطلب خلال 72 ساعة حسب السياسة المعلنة.
        `);
        
        // Show loading state
        const submitBtn = deletionForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate form submission delay
        setTimeout(() => {
            try {
                // Create mailto link
                const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
                
                // Try to open email client
                window.location.href = mailtoLink;
                
                // Show success message
                deletionForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Reset form
                deletionForm.reset();
                
            } catch (error) {
                console.error('خطأ في إرسال الطلب:', error);
                alert('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.');
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 2000);
    });
    
    // Form validation on input change
    const requiredFields = ['fullName', 'email', 'phone', 'reason'];
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'هذا الحقل مطلوب';
        }
        
        // Specific validation for email
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
            }
        }
        
        // Specific validation for phone
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'يرجى إدخال رقم هاتف صحيح';
            }
        }
        
        // Show error state
        if (!isValid) {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        } else {
            hideFieldError(field);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        // Remove existing error message
        hideFieldError(field);
        
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        
        // Insert after field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    function hideFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Add error styles to CSS
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #e74c3c;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
    `;
    document.head.appendChild(style);
});

// Alternative submission method using a form service (optional)
function submitToFormService(data) {
    // This is an example of how you might submit to a form service like Formspree
    // Replace with your actual form service endpoint
    /*
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Handle success
        console.log('Success:', data);
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
    */
}