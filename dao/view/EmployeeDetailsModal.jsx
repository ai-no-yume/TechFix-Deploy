import React, { useEffect } from 'react';

export default function EmployeeDetailsModal({ employee, onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Función para mostrar imagen de perfil
    const renderProfilePicture = (profilePicture) => {
        if (profilePicture) {
            if (profilePicture instanceof File) {
                return URL.createObjectURL(profilePicture);
            }
            return profilePicture;
        }
        return '';
    };

    // Función para mostrar la carta del empleado
    const renderLetter = (letter) => {
        if (letter) {
            if (letter instanceof File) {
                return URL.createObjectURL(letter);
            }
            return letter;
        }
        return '';
    };

    // Función para formatear el estado
    const formatStatus = (status) => {
        if (typeof status === 'boolean') {
            return status ? 'Active' : 'Inactive';
        }
        return 'Unknown'; // Valor por defecto si no es booleano o está indefinido
    };

    const handlePrint = () => {
        const printWindow = window.open('', '', 'width=800,height=1000,scrollbars=yes');

        // Escribir el contenido en la ventana emergente
        printWindow.document.write(`
        <html>
        <head>
            <title>${employee.firstName} ${employee.lastName} - Details</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                }
                h2 {
                    text-align: center;
                    color: #0056b3;
                }
                .profile-picture {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    display: block;
                    margin: 20px auto;
                }
                .section-title {
                    font-weight: bold;
                    color: #0056b3;
                }
                .employee-info p {
                    margin: 10px 0;
                }
                .employee-info {
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            <h2>${employee.firstName} ${employee.lastName} - Employee Details</h2>
            ${renderProfilePicture(employee.profilePicture) ? `<img src="${renderProfilePicture(employee.profilePicture)}" alt="Profile Picture" class="profile-picture" />` : ''}
            <div class="employee-info">
                <p><span class="section-title">DNI:</span> ${employee.id}</p>
                <p><span class="section-title">First Name:</span> ${employee.firstName}</p>
                <p><span class="section-title">Last Name:</span> ${employee.lastName}</p>
                <p><span class="section-title">Email:</span> ${employee.email}</p>
                <p><span class="section-title">Mobile:</span> ${employee.mobile}</p>
                <p><span class="section-title">Address:</span> ${employee.address}</p>
                <p><span class="section-title">Role:</span> ${employee.role}</p>
                <p><span class="section-title">Hire Date:</span> ${employee.hireDate}</p>
                <p><span class="section-title">Status:</span> ${formatStatus(employee.status)}</p>
                ${renderLetter(employee.letter) ? `<p><span class="section-title">Letter:</span> <a href="${renderLetter(employee.letter)}" target="_blank">View Letter</a></p>` : ''}
            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
                window.onafterprint = function() {
                    window.close();
                };
            </script>
        </body>
        </html>
    `);

        printWindow.document.close();
    };

    // Depuración para verificar el valor de status
    console.log('Employee status:', employee.status);

    return (
        <>
            <style>
                {`
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }
                    .modal-content {
                        background: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        width: 90%;
                        max-width: 500px;
                        max-height: 80vh;
                        overflow-y: auto;
                        position: relative;
                    }
                    .close-btn {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: #ff4d4f;
                        color: #fff;
                        border: none;
                        border-radius: 5px;
                        padding: 5px 10px;
                        cursor: pointer;
                    }
                    .modal-body {
                        text-align: center;
                    }
                    .profile-picture {
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;
                        object-fit: cover;
                        display: block;
                        margin: 20px auto;
                    }
                    .employee-info p {
                        margin: 10px 0;
                        text-align: left;
                    }
                    .print-btn {
                        margin-top: 20px;
                        padding: 10px 20px;
                        background: #0056b3;
                        color: #fff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                `}
            </style>
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-btn" onClick={onClose}>X</button>
                    <h2>Employee Details</h2>
                    <div className="modal-body">
                        {renderProfilePicture(employee.profilePicture) && (
                            <img
                                src={renderProfilePicture(employee.profilePicture)}
                                alt={`${employee.firstName} ${employee.lastName}`}
                                className="profile-picture"
                            />
                        )}
                        <div className="employee-info">
                            <p><strong>DNI:</strong> {employee.identification}</p>
                            <p><strong>First Name:</strong> {employee.firstName}</p>
                            <p><strong>Last Name:</strong> {employee.lastName}</p>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Mobile:</strong> +57 {employee.mobile}</p>
                            <p><strong>Address:</strong> {employee.address}</p>
                            <p><strong>Role:</strong> {employee.role}</p>
                            <p><strong>Hire Date:</strong> {employee.hireDate}</p>
                            <p><strong>Status:</strong> {formatStatus(employee.status)}</p>
                            {renderLetter(employee.letter) && (
                                <p><strong>Letter:</strong> <a href={renderLetter(employee.letter)} target="_blank" rel="noopener noreferrer">View Letter</a></p>
                            )}
                        </div>
                        <button className="print-btn" onClick={handlePrint}>Print Details</button>
                    </div>
                </div>
            </div>
        </>
    );
}