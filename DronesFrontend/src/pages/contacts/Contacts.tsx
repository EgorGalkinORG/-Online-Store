import { useForm } from "react-hook-form";
import { ICONS } from '../../shared';
import { Support } from "../../shared/types";
import { usePostSupportForm } from "../../hooks/use-post-support-form";
import styles from './contacts.module.css';

export function ContactsPage() {
    const { register, handleSubmit, formState, reset } = useForm<Support>();
    const { sendSupportRequest } = usePostSupportForm();

    const onSubmit = async (data: Support) => {
        await sendSupportRequest(data);
        reset();
    };

    const errors = formState.errors;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Контакти</h1>

                <div className={styles.contentBlock}>
                    <div className={styles.infoColumn}>
                        <h2 className={styles.infoTitle}>Наші контакти</h2>

                        <div className={styles.contactItem}>
                            <ICONS.phone />
                            <span>+38 (067) 123-45-67</span>
                        </div>

                        <div className={styles.contactItem}>
                            <ICONS.email />
                            <span>info@dronex.com.ua</span>
                        </div>

                        <div className={styles.contactItem}>
                            <ICONS.location />
                            <span>вул. Університетська, 22, м. Дніпро, 49000, Україна</span>
                        </div>

                        <div className={styles.contactItem}>
                            <ICONS.calendar />
                            <span>Пн–Пт: 10:00 – 18:00, Сб–Нд: вихідні</span>
                        </div>

                        <p className={styles.socialTitle}>Ми в соцмережах:</p>
                        <div className={styles.socialIcons}>
                            <a href="#" aria-label="Facebook"><ICONS.facebook /></a>
                            <a href="#" aria-label="Telegram"><ICONS.telegram /></a>
                            <a href="#" aria-label="Instagram"><ICONS.instagram /></a>
                        </div>
                    </div>

                    <form className={styles.formColumn} onSubmit={handleSubmit(onSubmit)}>
                        <h2 className={styles.formTitle}>Зв'язатися з нами</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Ім'я</label>
                            <input
                                {...register("name", { required: "Введіть ваше ім'я" })}
                                className={`${styles.formInput} ${errors.name ? styles.errorInput : ""}`}
                                type="text"
                                placeholder="Ваше Ім'я"
                            />
                            {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Телефон</label>
                            <input
                                {...register("number", { 
                                    required: "Введіть номер телефону",
                                    pattern: {
                                        value: /^\+380\d{9}$/,
                                        message: "Формат: +380XXXXXXXXX"
                                    }
                                })}
                                className={`${styles.formInput} ${errors.number ? styles.errorInput : ""}`}
                                type="tel"
                                placeholder="+380"
                            />
                            {errors.number && <p className={styles.errorMessage}>{errors.number.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>E-mail</label>
                            <input
                                {...register("email", { 
                                    required: "Введіть E-mail",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Невірний формат E-mail"
                                    }
                                })}
                                className={`${styles.formInput} ${errors.email ? styles.errorInput : ""}`}
                                type="email"
                                placeholder="Ваше E-mail"
                            />
                            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Повідомлення</label>
                            <textarea
                                {...register("description", { required: "Напишіть повідомлення" })}
                                className={`${styles.formTextarea} ${errors.description ? styles.errorInput : ""}`}
                                placeholder="Ваше повідомлення"
                            />
                            {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
                        </div>

                        <button type="submit" className={styles.submitBtn}>Надіслати</button>
                    </form>
                </div>
            </div>
        </div>
    );
}